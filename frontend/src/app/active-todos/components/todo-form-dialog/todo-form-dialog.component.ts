import { ChangeDetectionStrategy, Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { LocalStorageService } from "../../../core/services/local-storage.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { interval } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ToDo } from "../../../core/models/todo";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const SAVE_DATA_INTERVAL_MS = 5000;
const TO_DO_ITEM_KEY = 'TO-DO-ITEM';
const DESCRIPTION_MAX_LENGTH = 150;

@Component({
  selector: 'app-todo-form-dialog',
  templateUrl: './todo-form-dialog.component.html',
  styleUrl: './todo-form-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormDialogComponent implements OnInit {
  readonly descriptionMaxLength = DESCRIPTION_MAX_LENGTH;

  private localStoreService: LocalStorageService = inject(LocalStorageService);
  private translateService: TranslateService = inject(TranslateService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private snackBar: MatSnackBar = inject(MatSnackBar);
  private dialogRef: MatDialogRef<TodoFormDialogComponent> = inject(MatDialogRef);
  private destroyRef: DestroyRef = inject(DestroyRef);


  toDoForm: FormGroup = this.formBuilder.group({
    description: ['', [Validators.required, Validators.maxLength(DESCRIPTION_MAX_LENGTH)]],
    validUntil: [null, [Validators.required]]
  });

  minValidityDate: Date;
  maxValidityDate: Date;  

  ngOnInit() {
    this.initForm();
    this.setUpValidityDateRestrictions();
    this.setUpSavingInterval();
  }

  private setUpValidityDateRestrictions(): void {
    const currentDate = new Date();
    this.minValidityDate = currentDate;
    this.maxValidityDate = new Date(new Date().setFullYear(currentDate.getFullYear() + 1));
  }

  private initForm(): void {
    const savedToDo = this.localStoreService.getData(TO_DO_ITEM_KEY);
    if (savedToDo) {
      this.toDoForm.setValue(JSON.parse(savedToDo));
    }
  }

  private setUpSavingInterval(): void {
    interval(SAVE_DATA_INTERVAL_MS).pipe(takeUntilDestroyed(this.destroyRef))
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

  clearForm(): void {
    this.toDoForm.reset();
  }
}
