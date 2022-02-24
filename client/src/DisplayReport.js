import React, { useEffect } from 'react';
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
import './App.css';

export default function DisplayReport() {
    const { path } = useRouteMatch();
    const { version, result, buildNumber, test } = useParams();

    // useEffect(() => {
    //     fetch('http://localhost:5000/' + version + '/coreData/' + result + '/' + buildNumber + '/' + test)
    //         .then(res => res.json())
    //         .then(report => getReport(report))
    //         .then(console.log('JSON Received.'))
    // }, []);

    return (
        <Switch>
            <Route path={`${path}/jobData`}>
                {
                    // TODO: create a file to render job data (e.g. /coreData/passed)
                }
            </Route>
            <Route path={`${path}/buildData`}>
                {
                    // TODO: create a file to render build data (e.g. /coreData/passed/2)
                }
            </Route>
            <Route path={`${path}/testData`}>
                {
                    // TODO: create a file to render build data (e.g. /coreData/passed/2/testReport)
                }
            </Route>
        </Switch>
    );
}