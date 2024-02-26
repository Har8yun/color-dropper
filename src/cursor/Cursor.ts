export const getCursor = (fill = "#efefef") => {
    const svg = (
        `<svg
            width="128"
            height="128"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="${fill}" fill-rule="evenodd" clip-rule="evenodd"
                  d="M80 148C117.555 148 148 117.555 148 80C148 42.4446 117.555 12 80 12C42.4446 12 12 42.4446 12 80C12 117.555 42.4446 148 80 148ZM80 160C124.183 160 160 124.183 160 80C160 35.8172 124.183 0 80 0C35.8172 0 0 35.8172 0 80C0 124.183 35.8172 160 80 160Z"/>
                <rect x="75" y="75" stroke-width="1" stroke="grey" width="10" height="10" fill="transparent" />
        </svg>`
    );

    return "data:image/svg+xml;base64," + btoa(svg);
};
