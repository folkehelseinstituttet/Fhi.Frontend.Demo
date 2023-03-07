import { Component, Input, ViewChild } from '@angular/core';
import { ITreeState, ITreeOptions, TreeComponent } from '@circlon/angular-tree-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-treeview-example',
  templateUrl: './treeview-example.component.html'
})
export class TreeViewExampleComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;
  
  constructor(private modalService: NgbModal) { }
  
  elementName: string;

  @ViewChild(TreeComponent)
  private tree: TreeComponent;

  treeViewNodes: any = [
    {
      name: 'rot 1',
      children: [
        { name: 'barn 1.1' },
        { name: 'barn 1.2' }
      ]
    },
    {
      name: 'rot 2',
      children: [
        { name: 'barn 2.1', children: [] },
        {
          name: 'barn 2.2', children: [
            { name: 'barnebarn 2.2.1' }
          ]
        }
      ]
    },
    { name: 'rot 3' }
  ];

  state: ITreeState = {
    expandedNodeIds: {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true
    },
    hiddenNodeIds: {},
    activeNodeIds: {}
  };

  options: ITreeOptions = {
    allowDrag: true,
    allowDrop: true
  };

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' });
	}

  saveElement(modalDismiss: any) {
    let newElm = {
      name: this.elementName
    };
    
    this.treeViewNodes.push(newElm);
    this.tree.treeModel.update();

    modalDismiss;
    this.elementName = '';
  }

}
