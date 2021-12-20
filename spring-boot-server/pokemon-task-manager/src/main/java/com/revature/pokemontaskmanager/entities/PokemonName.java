package com.revature.pokemontaskmanager.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
// Pokemon just stores the id of a pokemon
// as well as an auto-generated id
public class PokemonName {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int dexNo;
    private String name;

    public PokemonName(int dexNo, String name) {
        this.dexNo = dexNo;
        this.name = name;
    }
}
