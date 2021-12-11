package com.revature.pokemontaskmanager.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(
        name = "users",
        uniqueConstraints = @UniqueConstraint(
            name = "email_unique",
            columnNames = "email"
        )
)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(
            name = "email",
            nullable = false
    )
    private String email;
    private String password;
    private String phone;
    private int points;
    private int level;
    private int starterId;


    // Mappings (all one to many)

//    private List<Task> tasks;

    // create a one to many relationship... one user can have many posts
    @OneToMany(targetEntity = Post.class, cascade = CascadeType.ALL)
    // foreign key: references user id:
    @JoinColumn(name = "post_fk", referencedColumnName="id")
    private List<Post> posts;

//    private List<Integer> pokemon;
//    private List<Integer> friendIds;

    /**
     * Tasks:
     * Rory: user, posts, pokemon
     * AJ: tasks, taskpoints
     * Cathy: friend ids and friend requests
     */


}
