package pl.zygmunt.todo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ToDo {
    public final static String DESCRIPTION_FIELD = "description";
    public final static String POSITION_FIELD = "position";
    public final static String CREATION_DATE_FIELD = "creationDate";
    public final static String EXPIRED_DATE = "expiredDate";
    public final static String RESOLVED_DATE = "resolvedDate";

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private int position;

    private String description;

    @Enumerated(EnumType.STRING)
    private ToDoStatus status;

    private LocalDate validUntilDate;

    private LocalDateTime creationDate;

    private LocalDateTime resolvedDate;

    private LocalDateTime expiredDate;
}
