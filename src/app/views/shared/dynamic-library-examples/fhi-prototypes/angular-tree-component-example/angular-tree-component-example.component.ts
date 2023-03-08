import { Component, Input, ViewChild } from '@angular/core';
import { ITreeState, ITreeOptions, TreeComponent } from '@circlon/angular-tree-component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-angular-tree-component-example',
  templateUrl: './angular-tree-component-example.component.html'
})
export class AngularTreeComponentExampleComponent {

  @Input() itemId!: string;
  @Input() itemIds!: any;
  
  constructor(private modalService: NgbModal) { }
  
  elementName: string;
  saveState: string | null = null;
  currentNode: any;

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

  editNode(content: any, nodeElm: any) {
    this.saveState = 'edit';
    this.elementName = nodeElm.name;
    this.currentNode = nodeElm;
    this.open(content);
  }

  newChildNode(content: any, nodeElm: any) {
    this.saveState = 'add-child';
    this.elementName = '';
    this.currentNode = nodeElm;
    this.open(content);
  }

  newBaseNode(content: any) {
    this.saveState = null;
    this.elementName = '';
    this.open(content);
  }

  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm' });
	}

  saveElement(modalDismiss: any) {
    if (this.saveState === null) {
      let newElm = {
        name: this.elementName
      };
      
      this.treeViewNodes.push(newElm);
    }
    if (this.saveState === 'edit') {
      this.currentNode.name = this.elementName;
    }
    if (this.saveState === 'add-child') {
      let newElm = {
        name: this.elementName
      }

      if (this.currentNode.children) {
        this.currentNode.children.push(newElm);
      } else {
        this.currentNode.children = [newElm];
      }
    }
    this.tree.treeModel.update();

    modalDismiss;
    this.elementName = '';
  }

  deleteNode(nodeElm: any) {
    let nodeChildren: any = nodeElm.children;
    let nodeId: string | number = nodeElm.id;
    let nodeName: string = nodeElm.name;
    let hasChildrenMsg: string = '';
    let hasChildren: boolean = false;
    if (nodeChildren !== undefined && nodeChildren.length > 0) {
      hasChildren = true;
      hasChildrenMsg = ' og dens under-elementer?';
    }
    if (confirm('Er du helt sikker på at du vil slette "' + nodeName + '"' + hasChildrenMsg)) {
      this.treeViewNodes = this.removeById(this.treeViewNodes, nodeId);
      this.tree.treeModel.update();
    }
  }

  private removeById = (arr: any, targetId: any) => arr.reduce((acc: any, obj: any) => 
  (obj.id === targetId) 
    ? acc 
    : [ ...acc, 
        {
          ...obj, 
          ...(obj.children && { children: this.removeById(obj.children, targetId) }) 
        }
      ],
  []);

}
