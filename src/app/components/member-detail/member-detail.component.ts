import { Component, Input, Inject, Optional, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Member } from '../../model/member';
import { DataService } from '../../services/data/data.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})

export class MemberDetailComponent implements OnInit {
  member: Member;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        let memberId = params.get('id');
        return this.dataService.getMembers().then(members => members.find(m => m._id == memberId));
      }).subscribe((member: Member) => this.member = member);
  }

  goToMembersList() {
    this.router.navigate(['/members']);
  }
}
