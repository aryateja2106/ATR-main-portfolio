"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import { toast as sonnerToast } from "sonner";

const iconsByType: Record<"success" | "error", ReactNode> = {
	success: <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />,
	error: <AlertCircle className="size-4 text-red-500 shrink-0" />,
};

interface ToastProps {
	id: string | number;
	type: "success" | "error";
	description: string;
}

function Toast(props: ToastProps) {
	const { id, type, description } = props;

	return (
		<div className="flex w-full justify-center">
			<div
				data-testid="toast"
				key={id}
				className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg w-full flex flex-row gap-3 items-center shadow-lg"
			>
				<div className="flex shrink-0">{iconsByType[type]}</div>
				<div className="text-neutral-200 text-sm">{description}</div>
			</div>
		</div>
	);
}

export function toast(props: Omit<ToastProps, "id">) {
	return sonnerToast.custom((id) => (
		<Toast id={id} type={props.type} description={props.description} />
	));
}
