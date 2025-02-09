import { useState } from 'react';
import {
    GridColumnMenuContainer,
    GridFilterMenuItem,
    HideGridColMenuItem,
} from '@mui/x-data-grid';

const DataGridColumnMenu = ({ hideMenu, currentColumn, open }) => {
    // State variables to track whether criteria are applied and column is concealed
    const [isCriteriaApplied, setisCriteriaApplied] = useState(false);
    const [isColumnConcealed, setisColumnConcealed] = useState(false);

     // Function to handle click event for applying filters to the current column
    const handleFilterMenuItemClick = () => {
        // Simulated logic: Apply filters to the current column
        console.log(`Filters applied to ${currentColumn.field}`);
        
        // Update state to reflect that filters are applied
        setisCriteriaApplied(true);

        // Hide the menu after clicking
        hideMenu();
    };

    const handleHideColumnMenuItemClick = () => {
        // Simulated logic: Hide the current column
        console.log(`Column ${currentColumn.field} hidden`);

        // Update state to reflect that the column is hidden
        setisColumnConcealed(true);

        // Hide the menu after clicking
        hideMenu();
    };

    return (
        <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} open={open}>
            <GridFilterMenuItem
                onClick={handleFilterMenuItemClick}
                column={currentColumn}
                disabled={isCriteriaApplied} // Disable if filter is already applied
            />
            <HideGridColMenuItem
                onClick={handleHideColumnMenuItemClick}
                column={currentColumn}
                disabled={isColumnConcealed} // Disable if column is already hidden
            />
        </GridColumnMenuContainer>
    );
};

export default DataGridColumnMenu;
