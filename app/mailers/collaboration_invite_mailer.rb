class CollaborationInviteMailer < ApplicationMailer
  self.deliver_later_queue_name = :realtime
  layout false # Loops SMTP expects a raw JSON payload — no HTML layout wrapping

  def invite_existing_user
    @invitee = params[:invitee]
    @inviter = params[:pending_invite].inviter
    @project = params[:pending_invite].project
    @invite_link = pending_invite_url(params[:pending_invite].token)

    mail(to: params[:pending_invite].invitee_email)
  end

  def invite_new_user
    @email = params[:pending_invite].invitee_email
    @inviter = params[:pending_invite].inviter
    @project = params[:pending_invite].project
    @invite_link = pending_invite_url(params[:pending_invite].token)

    mail(to: @email)
  end
end
