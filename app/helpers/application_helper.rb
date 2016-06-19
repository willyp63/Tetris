module ApplicationHelper
  def csrf_token
   "<input type='hidden' name='authenticity_token' value='#{form_authenticity_token}'>".html_safe
   end

   def error_messages(model)
    return "" unless model.errors.full_messages
    html = "<div><ul>"
    model.errors.full_messages.each do |msg|
      html += "<li>#{h(msg)}</li>"
    end
    if flash[:errors]
      flash[:errors].each do |msg|
        html += "<li>#{h(msg)}</li>"
      end
    end
    html += "</ul></div>"
    html.html_safe
  end
end
