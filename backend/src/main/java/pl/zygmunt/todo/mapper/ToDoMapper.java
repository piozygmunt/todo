package pl.zygmunt.todo.mapper;

import pl.zygmunt.todo.dto.ToDoDTO;
import pl.zygmunt.todo.model.ToDo;

import java.time.ZonedDateTime;

public class ToDoMapper {
    public static ToDoDTO toDTO(final ToDo toDo) {
        return ToDoDTO.builder()
                .id(toDo.getId().toString())
                .validUntilDate(toDo.getValidUntilDate().toString())
                .description(toDo.getDescription())
                .build();
    }

    public static ToDo fromDTO(final ToDoDTO toDoDTO) {
        return ToDo.builder()
                .validUntilDate(ZonedDateTime.parse(toDoDTO.getValidUntilDate()).toLocalDate())
                .description(toDoDTO.getDescription())
                .build();
    }
}
