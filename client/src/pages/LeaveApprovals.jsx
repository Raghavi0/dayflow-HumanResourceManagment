import { useEffect, useState } from "react";

export default function LeaveApprovals() {

  const [requests, setRequests] =
    useState([]);

  const loadRequests = async () => {

    const response =
      await fetch("/api/leaves");

    const data =
      await response.json();

    setRequests(data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const updateLeave = async (
    id,
    action
  ) => {

    const response = await fetch(
      `/api/leaves/${id}/${action}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          comment:
            "Reviewed by HR",
        }),
      }
    );

    if (!response.ok) {
      const data =
        await response.json();

      alert(data.message);
      return;
    }

    loadRequests();
  };

  return (

    <div className="leave-approvals">

      <h1>Leave Approvals</h1>

      <table>

        <thead>

          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {requests.map(
            (request) => (

              <tr key={request.id}>

                <td>
                  {request.employeeId}
                </td>

                <td>
                  {request.type}
                </td>

                <td>
                  {request.startDate}
                </td>

                <td>
                  {request.endDate}
                </td>

                <td>
                  {request.status}
                </td>

                <td>

                  {request.status ===
                    "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateLeave(
                            request.id,
                            "approve"
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateLeave(
                            request.id,
                            "reject"
                          )
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}

                </td>

              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}
