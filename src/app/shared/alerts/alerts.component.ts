import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { ContactUsService } from '../_services/contact-us.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss'],
    imports: [
        CommonModule,
        TranslateModule,
    ]
})
export class AlertsComponent implements OnInit {
    private readonly contactUsService: ContactUsService = inject(ContactUsService);
    public alertType: Signal<string>;

    ngOnInit(): void {
        this.alertType = computed(() => {
            return this.contactUsService.sendEmailStatus();
        });
    }

    public close(): void {
        this.contactUsService.sendEmailStatus.set(null);
    }
}
