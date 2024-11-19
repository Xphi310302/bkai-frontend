import { updateFAQ } from '../api';
import type { FAQ } from '../types';

export class FAQEditor {
  private faq: HTMLElement;
  private isEditing: boolean = false;

  constructor(faq: HTMLElement) {
    this.faq = faq;
    this.setupEditor();
  }

  private setupEditor() {
    const editButton = this.faq.querySelector('.faq-edit-btn');
    editButton?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleEdit();
    });
  }

  private async toggleEdit() {
    if (this.isEditing) {
      await this.saveChanges();
    } else {
      this.startEditing();
    }
    this.isEditing = !this.isEditing;
  }

  private startEditing() {
    const question = this.faq.querySelector('.faq-question-text') as HTMLElement;
    const answer = this.faq.querySelector('.faq-answer') as HTMLElement;
    const editButton = this.faq.querySelector('.faq-edit-btn') as HTMLElement;

    const questionInput = document.createElement('input');
    questionInput.value = question.textContent || '';
    questionInput.className = 'faq-edit-input';
    
    const answerInput = document.createElement('textarea');
    answerInput.value = answer.textContent || '';
    answerInput.className = 'faq-edit-textarea';

    question.replaceWith(questionInput);
    answer.replaceWith(answerInput);
    editButton.textContent = 'Save';
  }

  private async saveChanges() {
    const questionInput = this.faq.querySelector('.faq-edit-input') as HTMLInputElement;
    const answerInput = this.faq.querySelector('.faq-edit-textarea') as HTMLTextAreaElement;
    const editButton = this.faq.querySelector('.faq-edit-btn') as HTMLElement;

    const newQuestion = document.createElement('span');
    newQuestion.textContent = questionInput.value;
    newQuestion.className = 'faq-question-text';

    const newAnswer = document.createElement('div');
    newAnswer.textContent = answerInput.value;
    newAnswer.className = 'faq-answer';

    const faqId = parseInt(this.faq.dataset.id || '0');
    const documentId = this.faq.closest('.faq-document')?.dataset.documentId || '';

    try {
      const updatedFaq: FAQ = {
        id: faqId,
        question: questionInput.value,
        answer: answerInput.value,
        documentId
      };

      await updateFAQ(updatedFaq);
      
      questionInput.replaceWith(newQuestion);
      answerInput.replaceWith(newAnswer);
      editButton.textContent = 'Edit';
    } catch (error) {
      console.error('Failed to save FAQ:', error);
      // Keep the form in edit mode if save fails
      this.isEditing = true;
      alert('Failed to save changes. Please try again.');
    }
  }
}