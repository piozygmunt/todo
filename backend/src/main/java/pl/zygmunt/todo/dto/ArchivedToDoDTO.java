package pl.zygmunt.todo.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ArchivedToDoDTO {
    private String id;
    private String description;
    private String creationDate;
    private ToDoStatusDTO status;
    private String resolvedDate;
    private String expiredDate;

    public enum ToDoStatusDTO {
        ACTIVE,
        RESOLVED,
        EXPIRED
    }
}