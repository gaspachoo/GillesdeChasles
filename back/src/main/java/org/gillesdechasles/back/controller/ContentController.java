package org.gillesdechasles.back.controller;

import lombok.AllArgsConstructor;
import org.gillesdechasles.back.dto.ContentDto;
import org.gillesdechasles.back.service.ContentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@AllArgsConstructor @RestController
@RequestMapping("api/content")
public class ContentController {
    private ContentService contentService;

    @GetMapping("titles")
    public List<ContentDto> getContentTitlesByContentType(@RequestParam(name = "type") String contentType) {
        try {
            return contentService.getAllTitlesByContent(contentType);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid content type");
        }
    }

    @PostMapping()
    public ResponseEntity<ContentDto> createContent(@RequestBody ContentDto contentDto) {
        try {
            ContentDto createdContent = contentService.addContent(contentDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdContent);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid content type");
        }
    }

    @GetMapping("{id}")
    public ContentDto getContentById(@PathVariable int id) {
        try {
            return contentService.getContentById(id);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid content type");
        }
    }



}
