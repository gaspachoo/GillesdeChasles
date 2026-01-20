package org.gillesdechasles.back.service;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.dto.ContentDto;
import org.gillesdechasles.back.entity.Content;
import org.gillesdechasles.back.entity.ContentType;
import org.gillesdechasles.back.repository.ContentRepo;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service @AllArgsConstructor
public class ContentService {
    private final ContentRepo contentRepo;

    public List<ContentDto> getAllTitlesByContent(String contentType) {
        ContentType type = ContentType.valueOf(contentType.toUpperCase());
        List<Content> contents = contentRepo.findByContentType(type);

        return contents.stream()
                .map(content -> new ContentDto(
                        content.getId(),
                        content.getTitle(),
                        content.getContentType(),
                        null,  // Ne pas retourner le contenu complet pour les titres
                        content.getPublishedAt(),
                        null,
                        null,
                        Collections.emptySet(),
                        Collections.emptySet(),
                        Collections.emptySet(),
                        Collections.emptySet()
                ))
                .collect(Collectors.toList());
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

    public ContentDto getContentById(int id) {
        Content content =  contentRepo.findById(id).orElse(null);
        if (content != null) {
            return new ContentDto(
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
        );
        } else {
            return new ContentDto(null, null, null, null, null, null, null,
                    Collections.emptySet(), Collections.emptySet(),
                    Collections.emptySet(), Collections.emptySet());
        }

    }


}
