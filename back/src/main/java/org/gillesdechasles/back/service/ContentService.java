package org.gillesdechasles.back.service;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.dto.ContentDto;
import org.gillesdechasles.back.entity.Content;
import org.gillesdechasles.back.entity.ContentType;
import org.gillesdechasles.back.repository.ContentRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service @AllArgsConstructor
public class ContentService {
    private final ContentRepo contentRepo;

    @Transactional(readOnly = true)
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
        content.setContentText(contentDto.getContentText());
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

    @Transactional(readOnly = true)
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

    @Transactional
    public ContentDto updateContent(int id, ContentDto contentDto) {
        Content content = contentRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Content not found"));

        if (contentDto.getTitle() != null) {
            content.setTitle(contentDto.getTitle());
        }
        if (contentDto.getType() != null) {
            content.setContentType(contentDto.getType());
        }
        if (contentDto.getContentText() != null) {
            content.setContentText(contentDto.getContentText());
        }
        if (contentDto.getPublishedAt() != null) {
            content.setPublishedAt(contentDto.getPublishedAt());
        }
        if (contentDto.getImage() != null) {
            content.setImage(contentDto.getImage());
        }
        if (contentDto.getVideo() != null) {
            content.setVideo(contentDto.getVideo());
        }
        if (contentDto.getThemes() != null) {
            content.setThemes(contentDto.getThemes());
        }
        if (contentDto.getTags() != null) {
            content.setTags(contentDto.getTags());
        }
        // For collections with orphanRemoval=true, we must clear and add instead of replacing
        if (contentDto.getRecommendations() != null) {
            content.getRecommendations().clear();
            content.getRecommendations().addAll(contentDto.getRecommendations());
        }
        if (contentDto.getRecommendedBy() != null) {
            content.getRecommendedBy().clear();
            content.getRecommendedBy().addAll(contentDto.getRecommendedBy());
        }

        Content saved = contentRepo.save(content);
        return new ContentDto(
                saved.getId(),
                saved.getTitle(),
                saved.getContentType(),
                saved.getContentText(),
                saved.getPublishedAt(),
                saved.getImage(),
                saved.getVideo(),
                saved.getThemes(),
                saved.getTags(),
                saved.getRecommendations(),
                saved.getRecommendedBy()
        );
    }

    @Transactional
    public void deleteContent(int id) {
        Content content = contentRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Content not found"));
        contentRepo.delete(content);
    }


}
