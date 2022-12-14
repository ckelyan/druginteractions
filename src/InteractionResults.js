import { colorMap, textColorMap } from "./Const";
import { useEffect, useRef } from "react";

const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
    }, []);
    return isMountRef.current;
}

export default function InteractionResults(props) {
    const isMount = useIsMount();

    const [, , intType, , intMech, details, recomendations, references] = props.data || [];

    const styleWIcon = {
        marginLeft: 4
    }

    useEffect(() => {
        if (false) {
            const beforeLast = document.querySelector(".interaction-pane > div:nth-last-child(2) > p");
            const blPos = beforeLast.offsetTop;
            const blHeight = beforeLast.offsetHeight + 20;
            console.log(blPos, blHeight);
            document.documentElement.style.setProperty('--before-ref-height', "px")
        }
    });


    const rendered = (
        <div style={{height: 482, width: "100%", overflow: "scroll"}}>
            <div className="interaction-pane">
                {intType && 
                    <div className="int-type">
                        <p className="int-type__text" style={{background: colorMap[intType], color: textColorMap[intType], fontWeight: "bold"}}>{intType}</p>
                    </div>
                }
                {intMech &&
                    <div>
                       <p className='icon icon-wrench' style={styleWIcon}>{intMech}</p>
                    </div>
                }
                {details &&
                    <div>
                        <p className='icon icon-file' style={styleWIcon}>{details}</p>
                    </div>
                }
                {recomendations &&
                    <div>
                        <p>{recomendations}</p>
                        {references &&
                            <label className="ref">{references}</label>
                        }
                    </div>
                }
                {false &&
                    <div>
                        <p className="ref">{references}</p>
                    </div>
                }
            </div>
        </div>
    )

    return rendered;
}