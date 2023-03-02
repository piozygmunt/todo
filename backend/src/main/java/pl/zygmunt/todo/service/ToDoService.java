package pl.zygmunt.todo.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.zygmunt.todo.model.ToDo;
import pl.zygmunt.todo.model.ToDoSortBy;
import pl.zygmunt.todo.model.ToDoStatus;
import pl.zygmunt.todo.repository.ToDoRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ToDoService {
    static private final int MAX_ACTIVE_ELEMENTS = 5;
    private final ToDoRepository toDoRepository;

    public ToDoService(final ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public List<ToDo> getActiveToDos() {
        Pageable pageable = PageRequest.of(0, MAX_ACTIVE_ELEMENTS, Sort.Direction.ASC, ToDoSortBy.POSITION.getField());
        return toDoRepository.findAllByStatusIsIn(List.of(ToDoStatus.ACTIVE), pageable).getContent();
    }

    public Page<ToDo> getArchivedToDos(final Pageable pageable) {
        return toDoRepository.findAllByStatusIsIn(List.of(ToDoStatus.RESOLVED, ToDoStatus.EXPIRED), pageable);
    }

    public Optional<ToDo> createToDo(ToDo toDo) {
        int activeToDosCount = this.toDoRepository.countAllByStatusIsIn(List.of(ToDoStatus.ACTIVE));

        if (activeToDosCount >= MAX_ACTIVE_ELEMENTS) {
            return Optional.empty();
        }

        Integer maxPosition = this.toDoRepository.getMaxPosition();
        toDo.setPosition(Optional.ofNullable(maxPosition).map((position) -> position + 1).orElse(0));
        toDo.setStatus(ToDoStatus.ACTIVE);
        toDo.setCreationDate(LocalDateTime.now());
        return Optional.of(toDoRepository.save(toDo));
    }

    public boolean deleteToDo(UUID uid) {
        if (!toDoRepository.existsById(uid)) {
            return false;
        }

        toDoRepository.deleteById(uid);
        return true;
    }

    @Transactional
    public void reorderToDo(UUID uid, int position) {
        List<ToDo> activeToDos = new ArrayList<>(getActiveToDos());

        ToDo reorderedToDo = activeToDos
                .stream()
                .filter((toDo) -> toDo.getId().equals(uid))
                .findAny().orElse(null);

        if (reorderedToDo == null) {
            return;
        }

        activeToDos.remove(reorderedToDo);
        activeToDos.add(position, reorderedToDo);
        assignNewPositions(activeToDos);
    }

    @Transactional
    public Optional<ToDo> resolveToDo(UUID uid) {
        return toDoRepository.findById(uid)
                .map((toDo -> {
                    toDo.setStatus(ToDoStatus.RESOLVED);
                    toDo.setResolvedDate(LocalDateTime.now());
                    return toDo;
                }));
    }

    @Transactional
    @Scheduled(cron = "${todo.expireActiveTasksCron}")
    public void expireToDos() {
        LocalDateTime now = LocalDateTime.now();
        this.getActiveToDos().stream().filter((toDo) -> toDo.getValidUntilDate().isBefore(now.toLocalDate())).forEach((toDo) -> {
            toDo.setStatus(ToDoStatus.EXPIRED);
            toDo.setExpiredDate(now);
        });
    }

    private void assignNewPositions(List<ToDo> activeToDos) {
        for (int i = 0; i < activeToDos.size(); ++i) {
            activeToDos.get(i).setPosition(i);
        }
    }
}
