import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://finesseliv.com/backend/send-inquiry.php';

  constructor(private http: HttpClient) {}

  sendInquiry(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}