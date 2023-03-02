package pl.zygmunt.todo.mapper;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import pl.zygmunt.todo.dto.ArchivedToDoDTO;
import pl.zygmunt.todo.dto.ArchivedToDosQueryDTO;
import pl.zygmunt.todo.dto.ArchivedToDosResponseDTO;
import pl.zygmunt.todo.model.ToDo;
import pl.zygmunt.todo.model.ToDoSortBy;
import pl.zygmunt.todo.model.ToDoStatus;

import java.time.LocalDateTime;
import java.util.Optional;

public class ArchivedToDoMapper {
    static public Pageable toPageableQuery(final ArchivedToDosQueryDTO archivedToDosQueryDTO) {
        return PageRequest.of(
                archivedToDosQueryDTO.getRequestedPage(),
                archivedToDosQueryDTO.getPageSize(),
                ArchivedToDoMapper.getDirection(archivedToDosQueryDTO.getDirection()),
                ArchivedToDoMapper.getSortableField(archivedToDosQueryDTO.getSortBy())
        );
    }

    static public ArchivedToDosResponseDTO toArchivedToDosResponseDTO(final Page<ToDo> todos) {
        return ArchivedToDosResponseDTO.builder()
                .archivedToDos(todos.get().map(ArchivedToDoMapper::toArchivedToDoDTO).toList())
                .currentPage(todos.getNumber())
                .numberOfPages(todos.getTotalPages())
                .toDosCount(todos.getTotalElements())
                .build();
    }

    static private ArchivedToDoDTO toArchivedToDoDTO(final ToDo todo) {
        return ArchivedToDoDTO.builder()
                .id(todo.getId().toString())
                .description(todo.getDescription())
                .creationDate(todo.getCreationDate().toString())
                .status(ArchivedToDoMapper.statusToStatusDTO(todo.getStatus()))
                .resolvedDate(Optional.ofNullable(todo.getResolvedDate()).map(LocalDateTime::toString).orElse(null))
                .expiredDate(Optional.ofNullable(todo.getExpiredDate()).map(LocalDateTime::toString).orElse(null))
                .build();
    }

    static private Sort.Direction getDirection(final ArchivedToDosQueryDTO.Direction directionDTO) {
        return Sort.Direction.valueOf(directionDTO.name());
    }

    static private String[] getSortableField(final ArchivedToDosQueryDTO.SortBy sortByDTO) {
        return ToDoSortBy.valueOf(sortByDTO.name()).getField();
    }

    static private ArchivedToDoDTO.ToDoStatusDTO statusToStatusDTO(final ToDoStatus status) {
        return ArchivedToDoDTO.ToDoStatusDTO.valueOf(status.name());
    }
}
