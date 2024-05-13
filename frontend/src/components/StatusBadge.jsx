import React from 'react';
import { Badge } from "flowbite-react";
const StatusBadge = ({ status }) => {
  let color;

  switch (status) {
    case 'En attente':
      color = 'info';
      break;
    case 'En cours':
      color = 'warning';
      break;
    case 'Terminée':
      color = 'success';
      break;
    default:
      color = 'gray';
  }

  return (
    <div className="flex flex-wrap gap-2">
        <Badge color={color}>{status}</Badge>
    </div>

  );
};

export default StatusBadge;
