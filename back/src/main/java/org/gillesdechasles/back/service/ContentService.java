package org.gillesdechasles.back.service;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.dto.ContentDto;
import org.gillesdechasles.back.entity.ContentType;
import org.gillesdechasles.back.repository.ContentRepo;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service @AllArgsConstructor
public class ContentService {
    private final ContentRepo contentRepo;

    public ContentDto getAllTitlesByContent(String contentType) {
        ContentType type = ContentType.valueOf(contentType.toUpperCase());
        return contentRepo.findTitlesByContentType(type)
                .map(content -> new ContentDto(
                        content.getId(),
                        content.getTitle(),
                        content.getContentType(),
                        content.getContentText(),
                        content.getPublishedAt(),
                        content.getImage(),
                        content.getVideo(),
                        content.getThemes(),
                        content.getTags(),
                        content.getRecommendations(),
                        content.getRecommendedBy()
                ))
                .orElse(new ContentDto(null, null, null, null, null, null, null,
                        Collections.emptySet(), Collections.emptySet(),
                        Collections.emptySet(), Collections.emptySet()));
    }

}
