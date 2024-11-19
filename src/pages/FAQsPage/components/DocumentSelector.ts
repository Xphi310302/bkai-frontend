import type { Document } from '../../../components/FAQsPage/types';

export class DocumentSelector {
  private modal: HTMLElement;
  private documents: Document[] = [];
  private importedDocuments: Set<string> = new Set();
  private onImport: (documentId: string) => void;

  constructor(container: HTMLElement, onImport: (documentId: string) => void) {
    this.onImport = onImport;
    this.modal = this.createModal();
    container.appendChild(this.modal);
    this.setupEventListeners();
  }

  public async setDocuments(documents: Document[]) {
    this.documents = documents;
    this.renderDocumentList();
  }

  public addImportedDocument(documentId: string) {
    this.importedDocuments.add(documentId);
    this.renderDocumentList();
  }

  private createModal(): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'import-modal';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>Select Documents to Import FAQs</h2>
        <div class="document-list"></div>
        <button class="modal-close">Close</button>
      </div>
    `;
    return modal;
  }

  private renderDocumentList() {
    const listContainer = this.modal.querySelector('.document-list');
    if (!listContainer) return;

    listContainer.innerHTML = this.documents
      .map(doc => `
        <div class="document-item">
          <button class="document-select-btn ${this.importedDocuments.has(doc.id) ? 'imported' : ''}"
                  data-document-id="${doc.id}"
                  ${this.importedDocuments.has(doc.id) ? 'disabled' : ''}>
            ${doc.name}
            ${this.importedDocuments.has(doc.id) ? '<span class="imported-badge">Imported</span>' : ''}
          </button>
        </div>
      `)
      .join('');
  }

  private setupEventListeners() {
    const closeBtn = this.modal.querySelector('.modal-close');
    closeBtn?.addEventListener('click', () => this.hide());

    this.modal.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('document-select-btn') && !target.hasAttribute('disabled')) {
        const documentId = target.getAttribute('data-document-id');
        if (documentId) {
          this.onImport(documentId);
          this.addImportedDocument(documentId);
        }
      }
    });
  }

  public show() {
    this.modal.style.display = 'flex';
  }

  public hide() {
    this.modal.style.display = 'none';
  }
}