package com.revature.pokemontaskmanager.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(
        name = "tasks"
)
public class Task {
    @Id
    private int id;
    private boolean completed;
    private String title;
    private int points;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date date;
}
