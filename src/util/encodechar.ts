const type = (obj:any) => {
    const types = Object.prototype.toString.call(obj).split(' ');
    return types.length >= 2 ? types[1].slice( 0, types[1].length - 1 ) : '';
};


const buildParams = ( prefix:string, obj: {} | any[], add:(key: string, value: any) => void
) => {
    var name;

    if ( Array.isArray( obj ) ) {
        // Serialize array item.
        obj.forEach( ( i, v ) => {
            // Item is non-scalar (array or object), encode its numeric index.
            buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, add );
        });

    } else if ( type( obj ) === "Object" ) {
        // Serialize object item.
        for ( name in obj ) {
            buildParams( prefix + "[" + name + "]", obj[ name ], add );
        }
    } else {
        // Serialize scalar item.
        add( prefix, obj );
    }
}

// key/values into a query string
export const enCodeChar = ( data:{} ) => {
    let prefix;
    let s:Array<string> = [];
    let add = ( key:string, value:any ) => {
        // If value is a function, invoke it and return its value
        value = type( value ) === 'function' ? value() : value;
        if(value === null || value === undefined) return;
        s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
    };
    for ( prefix in data ) {
        buildParams( prefix, data[ prefix ], add );
    }
    // Return the resulting serialization
    return s.join( "&" ).replace( /%20/g, "+" );
};