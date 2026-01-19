package org.gillesdechasles.back.repository;

import org.gillesdechasles.back.entity.Content;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepo extends CrudRepository<Content, Integer> {
}