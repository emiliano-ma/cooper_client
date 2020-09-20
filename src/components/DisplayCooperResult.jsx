import React from "react";

import cooperCalculator from "../modules/cooperCalculator";
import {saveData} from "../modules/performanceData";
import { Button, Segment } from 'semantic-ui-react';

const DisplayCooperResult = ({ 
  distance,
  gender,
  age,
  authenticated,
  entrySaved,
  entryHandler
}) => {
  const result = cooperCalculator(distance, gender, age);

  const propsPassed = distance && age ? true : false;

  return (
    <>
      {propsPassed && (
        <>
          <Segment>
            <h3 id="cooper-message">
              {age} Years old, {gender} running {distance} meters.
            </h3>
            <h2 id="cooper-result">Result: {result}</h2>
          </Segment>

          {authenticated && !entrySaved ? (
            <Button
              color="google plus"
              id="save-result"
              onClick={() => saveData(
                result, 
                age, 
                distance, 
                gender, 
                entryHandler
                )
              }
            >
              Save entry
            </Button>
          ) : (
            <p id="response-message">Your entry was saved</p>
          )}
        </>
      )}
    </>
  );
};

export default DisplayCooperResult;