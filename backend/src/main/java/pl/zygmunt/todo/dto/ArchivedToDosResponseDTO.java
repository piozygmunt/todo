package pl.zygmunt.todo.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ArchivedToDosResponseDTO {
    private List<ArchivedToDoDTO> archivedToDos;
    private int currentPage;
    private int numberOfPages;
    private long toDosCount;
}
