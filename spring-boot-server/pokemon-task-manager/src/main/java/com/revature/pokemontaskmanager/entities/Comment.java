package com.revature.pokemontaskmanager.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Comparator;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Comment implements Comparable<Comment> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    private String comment;
    private String name;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date date;

    public Comment(String comment, String name, Date date) {
        this.comment = comment;
        this.name = name;
        this.date = date;
    }

    @Override
    public int compareTo(Comment other) {
        return this.date.compareTo(other.getDate());
    }
}
