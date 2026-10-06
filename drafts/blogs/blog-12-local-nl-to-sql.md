---
title: "Local Natural-Language-to-SQL With LM Studio or Ollama"
slug: "local-nl-to-sql"
date: "2026-07-12"
excerpt: "local-sql-agent is a Streamlit and Python project that turns natural language into SQL against a local SQLite database using LM Studio or Ollama."
tags: [agentic-ai, security, local-first, sql]
status: published
category: "Build Note"
related_projects: [local-sql-agent]
---

## Why this matters

Natural-language-to-SQL is the rare agent feature that nontechnical users understand immediately. Ask a business question, get a query, inspect the result.

The catch is privacy. To generate useful SQL, a model needs table names, column names, relationships, and the user's question. That schema is a map of the business. Sending it to a hosted model can leak more than a single row would.

`local-sql-agent` takes the local-first path. Its README describes a Python SQL agent that converts natural language into SQL, executes against a SQLite database, and uses a local LLM through LM Studio or Ollama.

## Who this is for

This is for:

- Founders who want quick answers from a small local database.
- Analysts who can read SQL but want a faster first draft.
- Engineers building internal tools where schema privacy matters.
- Teams evaluating local models before giving any AI tool database access.

It is not for unattended production writes. Generated SQL should start as read-only, reviewable output.

## What the project includes

The README lists a small Python application rather than a hidden platform:

- `app.py` for general Streamlit SQL queries
- `purchase_behavior_app.py` for purchase behavior analysis
- `llm_client.py` for LM Studio or Ollama API calls
- `sql_agent.py` for core SQL-agent behavior
- `setup_database.py` and `add_user_purchase_data.py` for sample SQLite data
- `db_utils.py` for database inspection, export, query, and import utilities
- `run.py` as the launcher
- `test_agent.py` as the test script
- Docker and Docker Compose files

That structure is useful because the trust boundary is inspectable. The database is SQLite. The model endpoint is local. The UI is Streamlit.

## Architecture

The local loop looks like this:

```text
user question
  -> Streamlit app
  -> local-sql-agent
  -> SQLite schema and data
  -> LM Studio or Ollama on localhost
  -> generated SQL
  -> execution result and explanation
```

The README names LM Studio at `http://127.0.0.1:1234` and Ollama at `http://127.0.0.1:11434`. It also documents `DATABASE_PATH`, `LLM_API_URL`, and `LLM_MODEL` as environment variables.

The important claim is narrow: this project keeps the model call local when configured with LM Studio or Ollama. It does not prove the generated SQL is correct.

## Commands documented by the README

The README includes setup commands for cloning, creating a virtual environment, installing requirements, setting up sample data, copying `.env.example`, running Streamlit, running Docker, using `db_utils.py`, and executing `test_agent.py`.

I am not repeating the full runbook here because I did not run the source locally in this workspace. The safest published version is a build note: what the project is, what it includes, and where review belongs.

## Useful guardrails

The guardrails I would require before using this on valuable data:

- read-only database credentials where the database supports them
- a query deny-list for mutation and schema-changing statements
- row limits for generated queries
- query timeouts
- schema minimization so the model sees only relevant tables
- a local audit log of question, generated SQL, and accepted result

SQLite is included with Python, which makes demos easy. For production-like use, permission boundaries should live in the database role and execution layer, not only in the prompt.

## Limits and security notes

Local execution protects against cloud model disclosure, but it does not make generated SQL correct. A local model can still misunderstand a metric, join on the wrong key, or produce an expensive query.

Also watch the local model endpoint. If LM Studio or Ollama binds beyond loopback, the privacy problem can move from "cloud API" to "anyone on the network." Keep model APIs on `127.0.0.1` unless there is a specific reason and network controls.

## What remains unverified

- Whether the current repo enforces read-only SQL execution.
- Whether the current implementation supports databases beyond SQLite.
- Whether the Docker path works unchanged with current LM Studio and Ollama releases.
- Whether `test_agent.py` passes on a clean checkout.
- Whether LangChain or other runtime dependencies are required by the current code.

## Source

GitHub source: [aryateja2106/local-sql-agent](https://github.com/aryateja2106/local-sql-agent)
