package pl.zygmunt.todo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ArchivedToDosQueryDTO {
    private int requestedPage;
    private int pageSize;
    private SortBy sortBy;
    private Direction direction;

    public enum SortBy {
        DESCRIPTION,
        CREATION_DATE,
        STATUS
    }

    public enum Direction {
        ASC, DESC
    }
}

