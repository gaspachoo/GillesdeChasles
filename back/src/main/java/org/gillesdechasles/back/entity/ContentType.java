package org.gillesdechasles.back.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ContentType {
    POEME,
    REFLEXION,
    DESSIN;

    @JsonCreator
    public static ContentType fromString(String value) {
        if (value == null) {
            return null;
        }
        return ContentType.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toJson() {
        return this.name();
    }
}

