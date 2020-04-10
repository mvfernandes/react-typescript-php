import styled from 'styled-components';

export const Container = styled.div`
    z-index: 99999;
    position: fixed;
    right: 5px;
    bottom: 5px;
    padding: 10px;
    transform: rotate(180deg);
    overflow-y: auto;
    overflow-x: none;
    ::-webkit-scrollbar{width: 0; height:0;}
    transition: all 0.2s;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        transform: rotate(180deg);

        @keyframes animateIn {0%{transform:translateX(1000px);opacity:0}100%{transform:translateX(0);opacity:1}}
        @keyframes slide-out-right{0%{transform:translateX(0);opacity:1}100%{transform:translateX(1000px);opacity:0;}}

        .slide-out-right{animation:slide-out-right .3s cubic-bezier(.55,.085,.68,.53) both}

        
        li {
            animation: animateIn .3s cubic-bezier(.25,.46,.45,.94) both;
            user-select: none;

            .custom-toast {
                transition: all 0.3s;
                cursor: default;
                box-shadow: -2px 2px 4px 1px rgba(0, 0, 0, 0.37);
                max-width: 350px;
                padding: 10px;
                margin: 5px 0;
                display: flex;
                align-items: center;

                &:active {
                    transform: scale(1.03);
                }

                .content {
                    flex: 1;
                }
                .close{
                    padding: 0;
                    margin-left: 10px;
                }
            }
        }
       
    }
`;