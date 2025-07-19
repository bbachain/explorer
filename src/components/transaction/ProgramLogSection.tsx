import React from "react";
import { Button } from "@mui/material";

// Components
import { SignatureProps } from "views/tx";
import { ProgramLogsCardBody } from "components/ProgramLogsCardBody";

// Hooks
import { useCluster } from "hooks/useCluster";
import { useTransactionDetail } from "hooks/useTransactionDetail";

// Utils
import { parseProgramLogs } from "utils/program-logs";

export function ProgramLogSection({ signature }: SignatureProps) {
  const [showRaw, setShowRaw] = React.useState(false);
  const { cluster, url } = useCluster();
  const details = useTransactionDetail(signature);

  const transactionWithMeta = details?.data?.transactionWithMeta;
  if (!transactionWithMeta) return null;
  const message = transactionWithMeta.transaction.message;

  const logMessages = transactionWithMeta.meta?.logMessages || null;
  const err = transactionWithMeta.meta?.err || null;

  let prettyLogs = null;
  if (logMessages !== null) {
    prettyLogs = parseProgramLogs(logMessages, err, cluster);
  }

  return (
    <>
      <div className="card bg-[#011909] shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Program Instruction Logs</h2>
          <Button
            variant={showRaw ? "outlined" : "contained"}
            color="primary"
            size="small"
            onClick={() => setShowRaw((r) => !r)}
            sx={{ mb: 2 }}
          >
            💻 Raw
          </Button>
          {prettyLogs !== null ? (
            showRaw ? (
              <RawProgramLogs raw={logMessages!} />
            ) : (
              <ProgramLogsCardBody
                message={message}
                logs={prettyLogs}
                cluster={cluster}
                url={url}
              />
            )
          ) : (
            <div className="card-body">
              Logs not supported for this transaction
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function RawProgramLogs({ raw }: { raw: string[] }) {
  return (
    <>
      {raw.map((log, key) => {
        return <div key={key}>{log}</div>;
      })}
    </>
  );
}
