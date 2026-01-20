package org.gillesdechasles.back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gillesdechasles.back.entity.*;

import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor @Data @NoArgsConstructor
public class ContentDto {
    private Long id;
    private String title;
    private ContentType type;
    private String contentText;
    private LocalDateTime publishedAt;
    private Image image;
    private Video video;
    private Set<Theme> themes;
    private Set<Tag> tags;
    private Set<Lien> recommendations;
    private Set<Lien> recommendedBy;
}
