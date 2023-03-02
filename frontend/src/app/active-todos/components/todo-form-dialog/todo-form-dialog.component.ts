import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {interval, Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ToDo} from "../../../core/models/todo";

const SAVE_DATA_INTERVAL_MS = 5000;
const TO_DO_ITEM_KEY = 'TO-DO-ITEM';
const DESCRIPTION_MAX_LENGTH = 150;


@Component({
  selector: 'app-todo-form-dialog',
  templateUrl: './todo-form-dialog.component.html',
  styleUrls: ['./todo-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormDialogComponent implements OnInit, OnDestroy {
  readonly descriptionMaxLength = DESCRIPTION_MAX_LENGTH;

  private intervalSubscription: Subscription;

  toDoForm: FormGroup = this.formBuilder.group({
    description: ['', [Validators.required, Validators.maxLength(DESCRIPTION_MAX_LENGTH)]],
    validUntil: [null, [Validators.required]]
  });

  minValidityDate: Date;
  maxValidityDate: Date;

  constructor(private localStoreService: LocalStorageService,
              private translateService: TranslateService,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<TodoFormDialogComponent>) {
    this.initForm();
  }

  ngOnInit() {
    this.setUpValidityDateRestrictions();
    this.intervalSubscription = this.createIntervalSubscription();
  }

  private setUpValidityDateRestrictions(): void {
    const currentDate = new Date();
    this.minValidityDate = currentDate;
    this.maxValidityDate = new Date(new Date().setFullYear(currentDate.getFullYear() + 1));
  }

  private initForm(): void {
    const savedToDo = this.localStoreService.getData(TO_DO_ITEM_KEY);
    if(savedToDo) {
      this.toDoForm.setValue(JSON.parse(savedToDo));
    }
  }

  private createIntervalSubscription(): Subscription {
    return interval(SAVE_DATA_INTERVAL_MS)
      .subscribe(() => {
        this.localStoreService.saveData(TO_DO_ITEM_KEY, this.toDoForm.getRawValue());
        this.snackBar.open(this.translateService.instant('createDialog.dataSavedLocally'));
      })
  }

  onSaveClick(): void {
    this.localStoreService.removeData(TO_DO_ITEM_KEY);
    const toDo: ToDo = {
      description: this.toDoForm.controls['description'].value,
      validUntilDate: this.toDoForm.controls['validUntil'].value
    }
    this.dialogRef.close(toDo);
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }

  clearForm(): void {
    this.toDoForm.reset();
  }
}
