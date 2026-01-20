package org.gillesdechasles.back.service;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.dto.ContentDto;
import org.gillesdechasles.back.entity.Content;
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

    public ContentDto addContent(ContentDto contentDto) {
        Content content = new Content(
                contentDto.getTitle(),
                contentDto.getType()
        );
        Content savedContent = contentRepo.save(content);

        return new ContentDto(
                savedContent.getId(),
                savedContent.getTitle(),
                savedContent.getContentType(),
                savedContent.getContentText(),
                savedContent.getPublishedAt(),
                savedContent.getImage(),
                savedContent.getVideo(),
                savedContent.getThemes(),
                savedContent.getTags(),
                savedContent.getRecommendations(),
                savedContent.getRecommendedBy()
        );
    }


}
