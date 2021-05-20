import '../../../App.css';
import React from 'react';

function GradeGuidelines() {
  return (
    <div>
      <h3 className="ml-13r text-center">Marking and Grading Guidelines</h3>
      <br />
      <br />
      <br />
      <ul className="ml-26r ">
        <li>
          <p>
            <strong>A:  </strong>
            <>Excellent score (90 - 100%)</>
          </p>
        </li>
        <br />
        <li>
          <p>
            <strong>B:  </strong>
            <>Good (80 - 90%)</>
          </p>
        </li>
        <br />
        <li>
          <p>
            <strong>C:  </strong>
            <>Satisfactory (70 - 80%)</>
          </p>
        </li>
        <br />
        <li>
          <p>
            <strong>D:  </strong>
            <>Just pass. Needs more attention. (40 - 60%)</>
          </p>
        </li>
        <br />
        <li>
          <p>
            <strong>E:  </strong>
            <>Failed! Has to appear in resit examination. (10 - 40%) *</>
          </p>
        </li>
        <br />
        <li>
          <p>
            <strong>F:  </strong>
            <>Failed with minimum marks possible! Has to appear in resit examination. (0 - 10%) *</>
          </p>
        </li>
        <br />
        <li>
          <p>
            <strong>G:  </strong>
            <>Failed! Didn't appear in examination. Has to appear in resit examination. (--) *</>
          </p>
        </li>

      </ul>
    </div>
  );
}

export default GradeGuidelines;
