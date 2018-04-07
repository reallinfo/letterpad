import React from "react";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { StaticRouter } from "react-router";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import Route from "./Route";
import config from "../config";

const context = {};

export default (req, client) => {
    const apolloContext = {};
    const clientApp = (
        <ApolloProvider client={client}>
            <StaticRouter
                location={req.url}
                context={context}
                basename={config.baseName}
            >
                <Route />
            </StaticRouter>
        </ApolloProvider>
    );

    return Promise.all([getDataFromTree(clientApp)])
        .catch(function(err) {
            // log that I have an error, return the entire array;
            console.log("A promise failed to resolve", err);
        })
        .then(() => {
            return {
                head: Helmet.renderStatic(),
                html: renderToString(clientApp),
                apolloState: client.extract()
            };
        });
};