import { Component, OnInit, Input } from '@angular/core';
import { OcTokenService } from '@ordercloud/angular-sdk';

@Component({
  selector: 'cms-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss']
})
export class HtmlEditorComponent implements OnInit {
  @Input() ocCookieName: string;

  constructor(private ocTokenService: OcTokenService) {}

  ngOnInit(): void {
    this.ocTokenService.SetAccess(
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJhcmFyaWNrXzJAZm91cjUxLmNvbSIsImNpZCI6ImNlMDk1YTMwLWJlZmYtNGVkYy1iOTYwLTZiMDhmZjg4NDNmZSIsInUiOiIxMTgxMjQ3IiwidXNydHlwZSI6ImFkbWluIiwicm9sZSI6WyJBZGRyZXNzQWRtaW4iLCJNZUFkbWluIiwiT3JkZXJBZG1pbiIsIk92ZXJyaWRlU2hpcHBpbmciLCJPdmVycmlkZVRheCIsIk92ZXJyaWRlVW5pdFByaWNlIiwiUHJvZHVjdEFkbWluIiwiUGFzc3dvcmRSZXNldCIsIlNldFNlY3VyaXR5UHJvZmlsZSIsIlByaWNlU2NoZWR1bGVBZG1pbiIsIlN1cHBsaWVyQWRtaW4iLCJTdXBwbGllclVzZXJBZG1pbiIsIlN1cHBsaWVyQWRkcmVzc0FkbWluIiwiU2hvcHBlciIsIlNoaXBtZW50QWRtaW4iLCJTdXBwbGllclJlYWRlciIsIlByb21vdGlvbkFkbWluIiwiQnV5ZXJSZWFkZXIiLCJCdXllckFkbWluIl0sImlzcyI6Imh0dHBzOi8vYXV0aC5vcmRlcmNsb3VkLmlvIiwiYXVkIjoiaHR0cHM6Ly9hcGkub3JkZXJjbG91ZC5pbyIsImV4cCI6MTU5MDYxNzcxNCwibmJmIjoxNTkwNTg3NzE0fQ.IjDUzDyW4KJvFlJu8pPL4ZMtVzh6ze1g01FrCKOyvxI'
    );
  }
}
