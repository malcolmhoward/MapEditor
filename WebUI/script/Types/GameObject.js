
class GameObject extends THREE.Object3D
{
	constructor(guid, name, transform, parent, children, parameters) 
	{
		super( );

        this.guid = guid;
        this.name = name;
        this.transform = transform;
	    this.objectParent = parent;
		this.objectChildren = children;
		this.parameters = parameters;

	}
	
	hasMoved() {
		return !this.transform.toMatrix().equals(this.matrixWorld.elements);
	}

	renderInit()
	{
		let geometry = new THREE.BoxBufferGeometry( 0.5, 0.5, 0.5, 1, 1, 1 );
		let material = new THREE.MeshBasicMaterial( 
		{
			color: 0xff0000,
			visible: true ,
			wireframe: true
		} );


		this.mesh = new THREE.Mesh(geometry, material);
		
		this.updateTransform();

		this.add(this.mesh);
	}

	updateTransform()
	{
		let matrix = new THREE.Matrix4();
		matrix.set(
			this.transform.left.x, this.transform.up.x, this.transform.forward.x, 0,
			this.transform.left.y, this.transform.up.y, this.transform.forward.y, 0,
			this.transform.left.z, this.transform.up.z, this.transform.forward.z, 0,
			0, 0, 0, 1);

		this.setRotationFromMatrix(matrix);

		this.position.set(this.transform.trans.x, this.transform.trans.y, this.transform.trans.z);
	}

	update( deltaTime )
	{
		//this.updateTransform( );
	}

	setTransform(linearTransform) {
		this.transform = linearTransform;
		this.onSetTransform(linearTransform);
	}

	onSetTransform(linearTransform) {
		this.matrixWorld.Set
	}
	

    Clone(guid) {
    	if(guid === undefined) {
    		guid = GenerateGuid();
	    }
	    return new GameObject(guid, this.name, this.transform, this.objectParent, this.objectChildren, this.parameters);
    }

    onMoveStart() {
		console.log("move start")
        // TODO: Validate that the object exists
	}

	onMove() {
		let scope = this;
		if(!scope.hasMoved()) {
			return;
		}
		signals.objectChanged.dispatch(this)
		// Send move message to client
	}
    onMoveEnd() {
	    let scope = this;
	    if(!scope.hasMoved()) {
		    return; // No position change
	    }
	    let command = new SetTransformCommand(this.guid, new LinearTransform().setFromMatrix(scope.matrixWorld), scope.transform)
	    editor.execute(command);
	    signals.objectChanged.dispatch(this)

	    // Send move command to server
    }

}

class EntityCreationParams {
	constructor(variation, networked) {
		this.variation = variation;
		this.networked = networked;
	}
}