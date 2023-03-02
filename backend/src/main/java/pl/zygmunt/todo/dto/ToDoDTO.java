package pl.zygmunt.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ToDoDTO {
    private String id;
    private String description;
    private String validUntilDate;
}
