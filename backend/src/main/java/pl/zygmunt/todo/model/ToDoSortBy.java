package pl.zygmunt.todo.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum ToDoSortBy {
    DESCRIPTION(new String[]{ToDo.DESCRIPTION_FIELD}),
    POSITION(new String[]{ToDo.POSITION_FIELD}),
    CREATION_DATE(new String[]{ToDo.CREATION_DATE_FIELD}),
    STATUS(new String[]{ToDo.RESOLVED_DATE, ToDo.EXPIRED_DATE});

    private final String[] field;
}
