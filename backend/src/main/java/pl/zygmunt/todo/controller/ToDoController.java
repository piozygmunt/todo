package pl.zygmunt.todo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.zygmunt.todo.dto.ArchivedToDosResponseDTO;
import pl.zygmunt.todo.dto.ToDoDTO;
import pl.zygmunt.todo.mapper.ArchivedToDoMapper;
import pl.zygmunt.todo.mapper.ToDoMapper;
import pl.zygmunt.todo.dto.ArchivedToDosQueryDTO;
import pl.zygmunt.todo.model.ToDo;
import pl.zygmunt.todo.service.ToDoService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class ToDoController {
    private final ToDoService toDoService;

    @PostMapping()
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDoDTO toDoDTO) {
        ToDo toDo = ToDoMapper.fromDTO(toDoDTO);
        return toDoService.createToDo(toDo)
                .map((todo) -> new ResponseEntity<>(todo, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteActiveToDo(@PathVariable final String id) {
        UUID uid = UUID.fromString(id);
        if(this.toDoService.deleteToDo(uid)) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("active")
    public List<ToDoDTO> getActiveToDos() {
        return toDoService.getActiveToDos().stream().map(ToDoMapper::toDTO).toList();
    }

    @PostMapping("{id}/reorder/{position}")
    public List<ToDoDTO> reorderToDo(@PathVariable final String id, @PathVariable final int position) {
        UUID uid = UUID.fromString(id);
        toDoService.reorderToDo(uid, position);
        return toDoService.getActiveToDos().stream().map(ToDoMapper::toDTO).toList();
    }

    @PostMapping("{id}/resolve")
    public ResponseEntity<ToDo> resolveToDo(@PathVariable final String id) {
        UUID uid = UUID.fromString(id);
        return toDoService.resolveToDo(uid)
                .map((todo) -> new ResponseEntity<>(todo, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("archived")
    public ArchivedToDosResponseDTO getArchivedToDos(@RequestBody ArchivedToDosQueryDTO archivedToDoQuery) {
        Pageable pageableQuery = ArchivedToDoMapper.toPageableQuery(archivedToDoQuery);
        Page<ToDo> archivedToDos = toDoService.getArchivedToDos(pageableQuery);
        return ArchivedToDoMapper.toArchivedToDosResponseDTO(archivedToDos);
    }
}


