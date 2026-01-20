import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContentDto {
  id: number;
  title: string;
  type: string;
  contentText: string;
  publishedAt: string;
  image: any;
  video: any;
  themes: any[];
  tags: any[];
  recommendations: any[];
  recommendedBy: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContentTitles(contentType: string): Observable<ContentDto[]> {
    return this.http.get<ContentDto[]>(`${this.apiUrl}/content/titles?type=${contentType}`);
  }

  getContentById(id: number): Observable<ContentDto> {
    return this.http.get<ContentDto>(`${this.apiUrl}/content/${id}`);
  }
}
