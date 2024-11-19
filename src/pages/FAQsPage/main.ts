import './style.css';
import { getFAQsByDocument, getDocuments } from './api';
import type { FAQ, Document } from './types';
import { FAQEditor } from './components/FAQEditor';
import { DocumentSelector } from './components/DocumentSelector';

class FAQComponent {
  private faqs: Map<string, FAQ[]> = new Map();
  private documents: Document[] = [];
  private container: HTMLElement;
  private documentSelector: DocumentSelector;

  constructor(container: HTMLElement) {
    this.container = container;
    this.documentSelector = new DocumentSelector(container, this.handleDocumentImport.bind(this));
    this.init();
  }

  private async init() {
    try {
      this.documents = await getDocuments();
      this.documentSelector.setDocuments(this.documents);
      this.render();
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  }

  private async handleDocumentImport(documentId: string) {
    try {
      const documentFaqs = await getFAQsByDocument(documentId);
      this.faqs.set(documentId, documentFaqs);
      this.render();
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to import FAQs:', error);
    }
  }

  private render() {
    const importedDocuments = Array.from(this.faqs.keys());
    const documentsHtml = importedDocuments
      .map(docId => {
        const document = this.documents.find(d => d.id === docId);
        if (!document) return '';
        
        return `
          <div class="faq-document" data-document-id="${document.id}">
            <h2 class="document-title">${document.name}</h2>
            ${this.renderFAQsForDocument(document.id)}
          </div>
        `;
      })
      .join('');

    this.container.innerHTML = `
      <div class="faq-header">
        <span class="faq-badge">GOT A QUESTION?</span>
        <h1 class="faq-title">New FAQs</h1>
        <button class="import-btn">Import FAQs</button>
      </div>
      <div class="documents-container">
        ${documentsHtml}
      </div>
    `;

    // Reattach the modal after innerHTML update
    this.documentSelector = new DocumentSelector(
      this.container,
      this.handleDocumentImport.bind(this)
    );
    this.documentSelector.setDocuments(this.documents);
    importedDocuments.forEach(docId => this.documentSelector.addImportedDocument(docId));
  }

  private renderFAQsForDocument(documentId: string): string {
    const documentFaqs = this.faqs.get(documentId) || [];
    return documentFaqs.map(faq => `
      <div class="faq-item" data-id="${faq.id}">
        <div class="faq-question">
          <span class="faq-question-text">${faq.question}</span>
          <div class="faq-controls">
            <button class="faq-edit-btn">Edit</button>
            <div class="faq-toggle"></div>
          </div>
        </div>
        <div class="faq-answer">${faq.answer}</div>
      </div>
    `).join('');
  }

  private setupEventListeners() {
    const importBtn = this.container.querySelector('.import-btn');
    importBtn?.addEventListener('click', () => {
      this.documentSelector.show();
    });

    const faqItems = this.container.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      new FAQEditor(item as HTMLElement);

      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const toggle = item.querySelector('.faq-toggle');

      question?.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).closest('.faq-edit-btn')) return;
        
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.querySelector('.faq-answer')?.classList.remove('active');
            otherItem.querySelector('.faq-toggle')?.classList.remove('active');
          }
        });

        answer?.classList.toggle('active');
        toggle?.classList.toggle('active');
      });
    });
  }
}

const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
  new FAQComponent(app);
}