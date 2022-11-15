function OptionalField(props) {
    var style = {
        marginBottom: 20,
    }
    return (
        props.value ? <div style={style}>
            <h2>{props.children}</h2>
            <p>{props.value}</p>
        </div> : null
    )
}

export default function InteractionResults(props) {
    const [thGroup, intGroup, delphiClass, intType, intMech, details] = props.data || [];

    const style = {
        padding: 20,
        overflow: "scroll",
        height: "100%",
    }

    return (
        <div style={style}>
            <OptionalField value={thGroup}>Therapeutic group</OptionalField>
            <OptionalField value={intGroup}>Interaction group</OptionalField>
            <OptionalField value={delphiClass}>Delphi class</OptionalField>
            <OptionalField value={intType}>Interaction type</OptionalField>
            <OptionalField value={intMech}>Interaction mechanism</OptionalField>
            <OptionalField value={details}>Details</OptionalField>
        </div>
    )
}