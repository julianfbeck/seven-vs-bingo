import type { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { AdminProjectionEntry } from "../lib/AdminProjectionEntry";
import { AdminProposal } from "../lib/AdminProposal";
import Navbar from "../lib/navbar";
import { TabBar } from "../lib/TabBar";
import { trpc } from "../utils/trpc";
import { prisma } from "../server/db/client";
import { FeedbackEntry } from "../lib/FeedbackEntry";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const isAdmin = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    select: {
      role: true,
    },
  });

  if (isAdmin?.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
const Admin: NextPage = () => {
  const [currentTab, setCurrentTab] = useState("bingo");

  const setTab = (tab: string) => {
    switch (tab) {
      case "bingo":
        return <BingoEntries />;
      case "felder":
        return <OldBingoEntries />;
      case "feedback":
        return <Feedback />;
    }
  };

  return (
    <>
      <Navbar />
      <Head>
        <title>Seven vs. Wild Bingo</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-black to-slate-900">
        <div className="container mx-auto max-w-sm mb-10">
          <TabBar changeTab={setCurrentTab} currentTab={currentTab} />
        </div>
        <div className="container mx-auto max-w-md">{setTab(currentTab)}</div>
      </main>
    </>
  );
};

const BingoEntries = () => {
  const { data: entries, refetch: reloadData } = trpc.useQuery([
    "projection.auth.getAllNew",
  ]);
  const ctx = trpc.useContext();
  const approveEntry = trpc.useMutation("projection.auth.Approve", {
    onMutate: () => {
      ctx.cancelQuery(["projection.auth.getAllNew"]);

      const optimisticUpdate = ctx.getQueryData(["projection.auth.getAllNew"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["projection.auth.getAllNew"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["projection.auth.getAllNew"]);
    },
  });

  const deleteEntry = trpc.useMutation("projection.auth.Delete", {
    onMutate: () => {
      ctx.cancelQuery(["projection.auth.getAllNew"]);

      const optimisticUpdate = ctx.getQueryData(["projection.auth.getAllNew"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["projection.auth.getAllNew"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["projection.auth.getAllNew"]);
    },
  });

  return (
    <>
      {entries?.map((entry) => (
        <AdminProposal
          reloadData={reloadData}
          projection={entry}
          key={entry.id}
          onAccept={async () =>
            approveEntry.mutateAsync({
              id: entry.id,
            })
          }
          onReject={async () =>
            deleteEntry.mutateAsync({
              id: entry.id,
            })
          }
        />
      ))}
    </>
  );
};

const OldBingoEntries = () => {
  const { data: entries, refetch: reloadData } = trpc.useQuery([
    "projection.getAll",
  ]);

  const ctx = trpc.useContext();
  const reCalculatePoints = trpc.useMutation("auth.points.recalculate");
  const hasBecomeTrue = trpc.useMutation("projection.auth.HasBecomeTrue", {
    onMutate: () => {
      ctx.cancelQuery(["projection.getAll"]);

      const optimisticUpdate = ctx.getQueryData(["projection.getAll"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["projection.getAll"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["projection.getAll"]);
    },
  });

  const isBlocked = trpc.useMutation("projection.auth.Blocked", {
    onMutate: () => {
      ctx.cancelQuery(["projection.getAll"]);

      const optimisticUpdate = ctx.getQueryData(["projection.getAll"]);
      if (optimisticUpdate) {
        ctx.setQueryData(["projection.getAll"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["projection.getAll"]);
    },
  });

  return (
    <>
      <button
        className="bg-slate-800 text-white p-2 rounded-md"
        onClick={async () => {
          await reCalculatePoints.mutateAsync();
        }}
      >
        Punkte neu berechnen
      </button>
      {entries?.map((entry) => (
        <AdminProjectionEntry
          key={entry.id}
          reloadData={reloadData}
          projection={entry}
          onHasBecomeTrue={async () =>
            await hasBecomeTrue.mutateAsync({
              id: entry.id,
            })
          }
          onBlock={async () => {
            await isBlocked.mutateAsync({
              id: entry.id,
            });
          }}
        />
      ))}
    </>
  );
};

const Feedback = () => {
  const { data: entries } = trpc.useQuery(["auth.bingoEntriesFeedback.get"]);
  const ctx = trpc.useContext();
  const deleteEntry = trpc.useMutation("auth.bingoEntriesFeedback.delete", {
    onMutate: () => {
      ctx.cancelQuery(["auth.bingoEntriesFeedback.get"]);

      const optimisticUpdate = ctx.getQueryData([
        "auth.bingoEntriesFeedback.get",
      ]);
      if (optimisticUpdate) {
        ctx.setQueryData(["auth.bingoEntriesFeedback.get"], optimisticUpdate);
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["auth.bingoEntriesFeedback.get"]);
    },
  });

  return (
    <>
      {entries?.map((entry) => (
        <FeedbackEntry
          key={entry.id}
          feedback={entry}
          onHasBeenDeleted={async () =>
            await deleteEntry.mutateAsync({
              id: entry.id,
            })
          }
        />
      ))}
    </>
  );
};

export default Admin;
