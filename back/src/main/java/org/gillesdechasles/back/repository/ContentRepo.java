package org.gillesdechasles.back.repository;

import org.gillesdechasles.back.entity.Content;
import org.gillesdechasles.back.entity.ContentType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ContentRepo extends CrudRepository<Content, Integer> {
    Optional<Content> findTitlesByContentType(ContentType contentType);
}