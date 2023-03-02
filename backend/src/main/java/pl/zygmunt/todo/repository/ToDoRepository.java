package pl.zygmunt.todo.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.zygmunt.todo.model.ToDo;
import pl.zygmunt.todo.model.ToDoStatus;

import java.util.List;
import java.util.UUID;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, UUID> {
    Page<ToDo> findAllByStatusIsIn(List<ToDoStatus> status, Pageable pageable);

    int countAllByStatusIsIn(List<ToDoStatus> status);

    @Query(value = "SELECT max(position) FROM ToDo")
    Integer getMaxPosition();
}
